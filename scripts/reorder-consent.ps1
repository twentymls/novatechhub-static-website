$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$iubendaTag = '<script type="text/javascript" src="https://embeds.iubenda.com/widgets/778a4775-74d8-425f-a037-dbe5f827e476.js"></script>'
$marker = '<!-- Iubenda Consent Management Platform: load before GTM -->'
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$updated = 0

Get-ChildItem -LiteralPath $root -Recurse -Filter '*.html' -File | ForEach-Object {
    $path = $_.FullName
    $content = [System.IO.File]::ReadAllText($path)
    $occurrences = ([regex]::Matches($content, [regex]::Escape($iubendaTag))).Count

    if ($occurrences -ne 1) {
        throw "Expected exactly one Iubenda tag in $path, found $occurrences"
    }

    $newline = if ($content.Contains("`r`n")) { "`r`n" } else { "`n" }
    $content = [regex]::Replace($content, "(?m)^[ \t]*$([regex]::Escape($marker))[ \t]*\r?\n", '')
    $content = [regex]::Replace($content, "(?m)^[ \t]*$([regex]::Escape($iubendaTag))[ \t]*\r?\n", '')
    $content = [regex]::Replace(
        $content,
        '<head>\r?\n',
        "<head>$newline$marker$newline$iubendaTag$newline",
        1
    )
    $content = [regex]::Replace($content, '[ \t]+(?=\r?$)', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $content = [regex]::Replace($content, '(?:\r?\n){2,}(?=</head>)', $newline)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
    $updated++
}

Write-Output "Updated $updated HTML files."

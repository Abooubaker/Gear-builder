from pathlib import Path

path = Path('/home/ubuntu/geardxf/client/src/original-theme.ts')
text = path.read_text()
for token in ('\\\\s', '\\\\d', '\\\\.', '\\\\(', '\\\\)'):
    text = text.replace(token, token[1:])
path.write_text(text)
print('normalized drag regex tokens')

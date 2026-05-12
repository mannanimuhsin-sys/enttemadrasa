from html.parser import HTMLParser
from pathlib import Path

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack=[]
        self.errors=[]
        self.voids={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

    def handle_starttag(self, tag, attrs):
        if tag in self.voids:
            return
        self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in self.voids:
            return
        if not self.stack:
            self.errors.append(f'Extra end tag </{tag}> at {self.getpos()}')
            return
        last, pos = self.stack.pop()
        if last != tag:
            self.errors.append(f'Mismatched end tag </{tag}> at {self.getpos()}, expected </{last}> from {pos}')

    def error(self, message):
        self.errors.append(message)

text = Path('index.html').read_text(encoding='utf-8')
parser = TagChecker()
parser.feed(text)
if parser.stack:
    print('Unclosed tags:')
    print('\n'.join(f'{tag} at {pos}' for tag, pos in parser.stack[-20:]))
if parser.errors:
    print('Errors:')
    print('\n'.join(parser.errors[:20]))
else:
    print('No parse tag errors detected')

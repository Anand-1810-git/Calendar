import http.server
import socketserver

PORT = 8000
class Handler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith('.jsx') or path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()

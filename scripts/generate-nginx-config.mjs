import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nginxRoot = join(root, 'deploy', 'local', 'nginx-win');
const confDir = join(nginxRoot, 'conf');
const wwwRoot = resolve(root, 'deploy', 'local', 'www');
const nginxPath = wwwRoot.replace(/\\/g, '/');

mkdirSync(confDir, { recursive: true });
mkdirSync(join(nginxRoot, 'logs'), { recursive: true });

const config = `worker_processes 1;

error_log logs/error.log;
pid logs/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
        listen 8080;
        server_name localhost;
        root "${nginxPath}";

        location = /kevin_gonzalez {
            return 301 /kevin_gonzalez/;
        }

        location /kevin_gonzalez/panel/ {
            allow 127.0.0.1;
            allow ::1;
            allow 201.143.107.182;
            allow 2806:290:a800:8fe5:8997:6761:2637:e3f1;
            deny all;
            try_files $uri $uri/ =404;
        }

        location ~* /kevin_gonzalez/.*\\.(env|git|bak)$ {
            deny all;
            return 404;
        }

        location = /kevin_gonzalez/vieja {
            return 301 /kevin_gonzalez/nueva;
        }

        location = /kevin_gonzalez/404.html {
            internal;
        }

        location = /kevin_gonzalez/ {
            try_files /kevin_gonzalez/index.html =404;
        }

        location /kevin_gonzalez/ {
            index index.html;
            error_page 404 /kevin_gonzalez/404.html;
            try_files $uri $uri/ =404;
        }
    }
}
`;

const out = join(confDir, 'nginx.runtime.conf');
writeFileSync(out, config, 'utf8');
console.log(`Config generada: ${out}`);

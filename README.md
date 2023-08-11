# dominion-sim-api

Collaborative project expanding from a [repl prototype](https://replit.com/@mpaulweeks/DominionSim)

## Hosting

- https://dashboard.render.com/web/srv-cimp8vp5rnurtfd5j7r0
- https://dominion-sim-api.onrender.com

## Testing

```bash
curl -X POST "http://localhost:3001/sim" -H "Content-Type: application/json" -d @post-data.json
```

## Hosting

```nginx
server {
  server_name dominion-sim-api.mpaulweeks.com;

  location / {
    include /etc/nginx/cors_public.conf;
    proxy_pass http://localhost:3220;
    proxy_set_header Host $host;
  }
}
```

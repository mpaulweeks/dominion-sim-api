import '../prototype';
import { WebServer } from "../express/webServer";

const port = process.env.PORT || 3001;
new WebServer().listen(port);

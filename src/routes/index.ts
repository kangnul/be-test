import { response_not_found, response_success } from "$utils/response.utils";
import { Request, Response, Router } from "express";
// import RoutesRegistry from "./RoutesRegistry";
// import { Application } from "express";
import routes from "./RoutesRegistry";
import fileRoutes from "./fileRoute";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return response_success(res, "main routes!");
})

router.get('/robots.txt', function (req:Request, res:Response) {
  res.type('text/plain')
  res.send(
    `User-agent: *\nAllow: /`);
});
router.get("/ping", (req: Request, res: Response) => {
  return response_success(res, "pong!");
});


//router.use("/example", RoutesRegistry.ExampleRoutes)

for (const route of routes) {
  router.use("/api", route);
}

router.use("/api", fileRoutes);

router.all("*", (req: Request, res: Response) => {
  return response_not_found(res);
});

export default router;

export const mainErrorHandler = (err: any, req: any, res: any, next: any) => {
    console.log(err.message);
    res.status(500).send(err.message);
}
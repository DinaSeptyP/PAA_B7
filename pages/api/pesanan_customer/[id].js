import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res){
    

    if(req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);

    console.log(auth)
    const { id } = req.query;

    const posts = await db('pesanan').where('id_customer', id);
    res.status(200);
    res.json({
        message: 'posts data',
        data: posts,
    })
};
    
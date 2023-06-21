import knex from 'knex';
import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res){
    

    if(req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);

    console.log(auth)
    const { id } = req.query;

    // const posts = await db('pesanan').where('id_customer', id);
    const posts = await db('pesanan').join('produk', 'id', 'pesanan.id_produk').where('pesanan.id_customer', id);
    // const posts = await knex.select(
    //     'p.id_pesanan',
    //     'p.tanggal_selesai',
    //     'p.status',
    //     'p.id_produk',
    //     'p.id_customer'
    //     )
    //     .from('pesanan AS p')
    //     .leftJoin('produk AS pr', 'pr.id', 'pr.nama_barang', 'pr.deskripsi', 'pr.harga', 'pr.stok', 'pr.url_gambar')
    //     .where('p.id_customer', '=', id)
    res.status(200);
    res.json({
        message: 'posts data',
        data: posts,
    })
};
    
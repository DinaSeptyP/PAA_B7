import knex from 'knex';
import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req,res){
    if(req.method !== 'POST') return res.status(405).end();
    
    const auth = await authorization(req,res);

    const { id_produk, id_customer, tanggal_selesai, total_harga } = req.body;

    const create = await db('pesanan').insert({
        id_produk,
        id_customer,
        tanggal_selesai,
        total_harga
    });

    await db('produk').where('id', id_produk).update({ status: 500 });
    const createdData = await db('pesanan');
    // const updateData = await db('produk')

    //where('id', create).first();
    //try this: https://gist.github.com/ntry/8a87ecb8427f044211dc3bfa390ff971#file-bootstrap-tutorial-gulp4-gulpfile-js
    //from discusstion: https://github.com/creativetimofficial/argon-design-system/issues/67

    res.status(200);
    res.json({
        message: "Produk berhasil ditambahkan",
        data: createdData
    })
}
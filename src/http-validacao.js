import chalk from "chalk";

function extraiURLs(arrLinks){
    return arrLinks.map((objetolink) => Object.values(objetolink).join())
}
async function checaStatusURLs(listaURLs){
    const arrStatusUrls = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const res = await fetch(url)
                return res.status;
            } catch(erro){
                return manejaErrosGatinho(erro);
            }
        })
    )
    return arrStatusUrls;
}

function manejaErrosGatinho (erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro'; // TENTAR CAUSAR UM ERRO DIFERNTE DE ENOTFOUND
    }
}

export default async function listaValidada(listaDeLinks){
    const listaUrls = extraiURLs(listaDeLinks);
    const listaStatus = await checaStatusURLs(listaUrls);

    return listaDeLinks.map((objeto,indice) => ({
        ...objeto, status: listaStatus[indice]
    }))
}



import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';

interface Props {
    posts: any;
}

const home: React.FC<Props> = ({ posts }) => {

    const { version } = require('../../package.json');
    
    return (
        <>
            <Head>
                <title>Petpal</title>
                {/* Essential META Tags */}
                <meta property="og:title" content='Minagro - A maior plataforma de análise de imóvel rural do Brasil' />
                <meta property="og:type" content="article" />
                {/* <meta property="og:image" content="/home-share.jpeg" /> */}
                <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
                <meta name="twitter:image" content="/home-share.jpeg" />
                <meta name="twitter:card" content="summary_large_image" />

                {/* Non-Essential, But Recommended */}
                <meta property="og:description" content="Fiz a análise do meu imóvel rural na Minagro! Gostei muito e por isso estou compartilhando com você. Acesse já a descubra também o verdadeiro potencial da sua terra. É gratuito!" />
                <meta property="og:site_name" content="European Travel, Inc." />
                <meta name="twitter:image:alt" content="Minagro - A maior plataforma de análise de imóvel rural do Brasil" />
                
                {/* Versão */}
                <meta name="version" content={version}/>
            </Head>
            <Header />
            <div className="container-md">100% wide until medium breakpoint</div>
        </>
    );
}

export default home;

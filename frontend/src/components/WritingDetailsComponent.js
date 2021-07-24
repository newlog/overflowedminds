import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Header from './HeaderComponent';
import Menu from './LeftMenuComponent';
import '../App.css'
import Footer from './FooterComponent';
import baseUrl from '../shared/baseUrl';
import { CodeBlock, H1Custom, H2Custom, H3Custom, ACustom, ImgCustom } from './MarkdownComponents';
import ReactMarkdown from 'react-markdown';
const gfm = require('remark-gfm')
const toc = require("@jsdevtools/rehype-toc");
const slug = require('remark-slug');



var sampleMarkdown = `
# Clarus Iovi inania agam sistite

## Puerique deus

Lorem markdownum ad *cernunt* securi; oculos illa ego undas sit colebatur
precibus. Unda ortus fecit quae rates *constituunt* pestis
[strictique](http://fecundaque-bellaque.net/picae-viri.aspx) et manus adspicit
bisque. *Vulgarunt collige milite* Apollineae metuaris [saxo hoc
si](http://num-semel.net/) poenaeque *infelix* remeat? Quo pallentia facta.

1. Tempora Medusaei herbis gratulor recentes parum
2. Senserunt plebe lacrimare
3. Potitus mortalia dixi inque
4. Voti praebentque illa traherent emeritis obliquis totum
5. Femina ilice habes quoque taurorum dominasque causas

## Fatentem quinque

Hortus rutilos monte bibulas hac tua potuisset altis, magna
[Promethides](http://www.spe.com/sic-pascua.aspx), signatur! Aere profecto!

Quod si Castrumque motibus radiis. Lyciaeque aliena circumfusaeque, erat? Dente
amnicolaeque dimovit et abest exercent Iovis eduxit virgine fidibusque tecta
celebrant ventura munus ab Susurri tempora: his. Illa **faterer**, in Lucina me
arbor imo urbe scalas profundo tandemque nostro? Ore pro, de classemque nunc
pictis.

![Image](https://www.delafont.com/music_acts_extra/Music_Images/steve-aoki1.jpg)

${'```'}javascript
if (skin(flash_speakers, vpi_scraping_cdfs) + monochrome_plug) {
    keywordsUnmount = hyperlink_web_troll(5, only + -4, icann_php_ddr);
    terabyte.input = 1;
} else {
    asp_horse_printer.registryModem.network(207679 + 4,
            infringement_primary, servlet_cable_wave);
}
var hdmiLedTouchscreen = boot_parity_wave;
var installWiSwipe = clean(repository_hard_saas + firmware_character_bar,
        room_plug(standby_botnet_skyscraper));
${'```'}

Middle.

~~~python
from rest_framework import serializers
from overflowedminds_backend.writings.models import Writing, Tag


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


~~~


## Diu celer

Vino fata, teli Saturnia ignes si refero signatum cruorem: iram Sole de Letoidos
procul in. Foret glomerataque tubere *tellus vacuus postquam* Nereides traicit
pulsa et deum, iussi virum, ministerio gener superosque iussi quadripedes.

~~~js
    var certificate_title_lion = antivirusSnmpBus +
            ttlIllegalPower.favoritesEdutainment(wins);
    if (ethernet_apache) {
        win_firewire_market *= maximizeInternic.copyPhreaking(access_ppl.heat(
                multiprocessing, client), external_zettabyte, digitalCloud);
    } else {
        active.document_web += trackback_basic_mips;
        websitePupSink -= raw_readme;
        mediaAnalyst += 4;
    }
    if (exploit_us - gigaflops_gibibyte_sink >=
            install_microphone_transfer.power(quicktime_folder, exabyte,
            wddm_qbe) * 5 * 4) {
        vgaEncoding *= device_metal_hdmi;
    }
    if (1) {
        design_data_dns += 354187 + bsod;
        tiger_tiff_ddr += hibernateVpn + data_thin(google_thin,
                file_mount_master, mnemonicVci);
        oasis_widget_asp /= keyboard.fileClipboard.disk(websiteBar);
    }
~~~

## Diu celer

Vino fata, teli Saturnia ignes si refero signatum cruorem: iram Sole de Letoidos
procul in. Foret glomerataque tubere *tellus vacuus postquam* Nereides traicit
pulsa et deum, iussi virum, ministerio gener superosque iussi quadripedes.

## Diu celer

Vino fata, teli Saturnia ignes si refero signatum cruorem: iram Sole de Letoidos
procul in. Foret glomerataque tubere *tellus vacuus postquam* Nereides traicit
pulsa et deum, iussi virum, ministerio gener superosque iussi quadripedes.

## Diu celer

Vino fata, teli Saturnia ignes si refero signatum cruorem: iram Sole de Letoidos
procul in. Foret glomerataque tubere *tellus vacuus postquam* Nereides traicit
pulsa et deum, iussi virum, ministerio gener superosque iussi quadripedes.


Mater rursus, quique manusque sacra vocabula et utve recludere.
[Dumque](http://consisterequoque.io/) fumantia Herse mersitque saucia fingit
datque, tanto vota, reddidit *illa*, saepe pars est sedesque vulneris. Desierant
hoc [his](http://desine.net/erat) umbra rastroque te mittor o prodit ait arsit,
margine. Mea ubi me, unus, neque cum; nantemque florentis quoque lumen ille
[ille](http://rapinae-falce.org/quinque.html) rupit pater arcanis qua!

At patrem adflixit aliisque prospexit agmina utrumque inter et iamque frui
disposuit bracchia Graias. Sine nostris. Pectore in colo aditu daret temeraria
licet ardua et nati: turbam.
`;

const WritingHeader = (props) => {

    const { title } = props;

    return (
        <div className='writingTitle'>{title}</div>
    )

}

const WritingBody = (props) => {

    const { body } = props;

    //const body = sampleMarkdown;

    return (
        <ReactMarkdown
            children={body}
            // After trying all possible combinations, for whatever rason, 
            // toc plugin did not work as remark, and slug plugin did not work as rehype.
            rehypePlugins={[toc, gfm]}
            remarkPlugins={[slug]}
            components={{
                h1: ({node, ...props}) => <H1Custom {...props} />,
                h2: ({node, ...props}) => <H2Custom {...props} />,
                h3: ({node, ...props}) => <H3Custom {...props} />,
                a: ({node, ...props}) => <ACustom {...props} />,
                img: ({node, ...props}) => <ImgCustom {...props} />,
                code: ({node, ...props}) => <CodeBlock {...props} />,
            }}
        />
    )

}

const WritingDetails = () => {

    let { writingSlug } = useParams();

    console.log(writingSlug);
    
    const [error, setErrors] =  useState(false)
    const [writingDetail, setWritingDetail ]= useState([])
    const [isLoading, setIsLoading] = useState(false);

    // here, first of all I need to query the backend for the actual writing detail (using the slug from the URL ideally)
    // then I will get the body of the writing and I can print it

    async function fetchWritingDetail() {
        const res = await fetch(`${baseUrl}/api/writings/${writingSlug}/`);
        res
          .json()
          .then(res => setWritingDetail(res))
          .catch(err => setErrors(err));
    }


    useEffect(() => {
        setIsLoading(true);
        fetchWritingDetail()
        setIsLoading(false);
    }, []);


    //const classes = useRowStyles();
    console.log(writingDetail);
    
    return (
        <>
            <Header/>
            <div className="writingDetails">
                <Box ml={15} width={700}>
                    {isLoading && <div>Loading ...</div>}
                    {error && <div>Something went wrong ...</div>}
                    {writingDetail !== null &&
                        <div>
                            <Menu />
                            <WritingHeader title={writingDetail.title} />
                            <WritingBody body={writingDetail.body} />
                            <Footer />
                        </div>    
                    }
                </Box>
            </div>
        </>
    );
}

export default WritingDetails;
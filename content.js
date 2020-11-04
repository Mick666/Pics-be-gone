let ranAlready = false

window.onload = async function () {
    const setting = await getCheckingCaps()
    if (setting) removePictures()
}

function getCheckingCaps() {
    return new Promise(options => {
        chrome.storage.local.get({ pictureRemove: true }, function (data) {
            options(data.pictureRemove)
        })
    })
}

function removePictures() {
    const url = window.location.href.toString()
    if (url.startsWith('https://www.theaustralian.com.au/')  && url !== 'https://www.theaustralian.com.au/') {
        removeAllClassEl('story-related-links__inline')
        removeAllClassEl('story-image')
        removeAllClassEl('circular-widget view-xlarge')
        removeAllClassEl('newsletter-signup')
        removeAllClassEl('story-iframe')
        if (document.getElementById('story-media-assets')) document.getElementById('story-media-assets').remove()
        addHeader('TheAus')
    } else if (url.startsWith('https://www.afr.com/')   && url !== 'https://www.afr.com/') {
        removeAllClassEl('gzJMC')
        removeAllClassEl('_1bH_l')
        removeAllClassEl('infogram-embed')
        removeAllClassEl('_2Ghbh')
        removeAllClassEl('_3-KSC')
        removeAllClassEl('-KHCP')
        removeAllClassEl('_3f9Zo');
        [...document.querySelectorAll('blockquote')].forEach(x => x.remove())
        addHeader('AFR')
    } else if (url.startsWith('https://www.smh.com.au/') || url.startsWith('https://www.theage.com.au/')) {
        removeAllClassEl('_3nhoI')
        removeAllClassEl('_3ujPS')
        removeAllClassEl('ymInT')
        removeAllClassEl('_6ebFV')
        removeAllClassEl('AkZ3C')
        addHeader('SMH')
    }  else if (url.startsWith('https://www.brisbanetimes.com.au/') && url !== 'https://www.brisbanetimes.com.au/') {
        removeAllClassEl('_3nhoI')
        removeAllClassEl('_3ujPS')
        removeAllClassEl('ymInT')
        addHeader('Brisbane Times')
    } else if (url.startsWith('https://www.canberratimes.com.au/') && url !== 'https://www.canberratimes.com.au/') {
        removeAllClassEl('lead-image media')
        removeAllClassEl('story-generic__iframe')
        removeAllClassEl('story-image');
        [...document.getElementsByClassName('assets')].filter(x => x.firstElementChild && x.firstElementChild.firstElementChild && x.firstElementChild.firstElementChild.innerText === 'READ MORE:').forEach(x => x.parentElement.remove());
        // [...document.querySelectorAll('a')].filter(x => x.parentElement && x.parentElement.nodeName === 'LI' && x.parentElement.className !== 'signature__name').forEach(x => x.parentElement.remove())
        addHeader('CT')
    } else if (url.startsWith('https://www.themandarin.com.au/') && url !== 'https://www.themandarin.com.au/') {
        [...document.querySelectorAll('figure')].forEach(x => x.remove())
        addHeader('Mando')
    } else if (url.startsWith('https://www.dailytelegraph.com.au/') && url !== 'https://www.dailytelegraph.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('ADT')
    } else if (url.startsWith('https://www.couriermail.com.au/') && url !== 'https://www.couriermail.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('Courier Mail')
    } else if (url.startsWith('https://www.news.com.au/') && url !== 'https://www.news.com.au/') {
        removeAllClassEl('image')
        removeAllClassEl('video')
        addHeader('News.com.au')
    } else if (url.startsWith('https://www.heraldsun.com.au/') && url !== 'https://www.heraldsun.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('HSM')
    } else if (url.startsWith('https://www.themercury.com.au/') && url !== 'https://www.themercury.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('MERH')
    } else if (url.startsWith('https://www.adelaidenow.com.au/') && url !== 'https://www.adelaidenow.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('ADA')
    } else if (url.startsWith('https://www.ntnews.com.au/') && url !== 'https://www.ntnews.com.au/') {
        removeAllClassEl('w_customHTML')
        removeAllClassEl('tge-imagecaption')
        removeAllClassEl('promoImage image-full')
        removeAllClassEl('atom-videoplayer')
        addHeader('NTN')
    }  else if (url.startsWith('https://thewest.com.au/') && url !== 'https://thewest.com.au/') {
        removeAllClassEl('css-ac4gl9-StyledFigure')
        removeAllClassEl('css-1dwsh2l-StyledPullquote')
        removeAllClassEl('css-1hqo8ex-StyledUnorderedList-StyledBaseList')
        removeAllClassEl('css-1f5bi3i-StyledEmbed-StyledTwitterEmbed')
        addHeader('WSTA')
    }
}

function removeAllClassEl(className) {
    [...document.getElementsByClassName(className)].forEach(x => x.remove())
}

function addHeader(outletName) {
    const date = new Intl.DateTimeFormat('en-GB').format(new Date()).toString().replace(/\/20([0-9]{2})/, '/$1')
    let headline, byline, outlet, firstPara
    switch (outletName) {
    case 'TheAus':
        if (document.getElementsByClassName('story-headline__title').length > 0) headline = document.getElementsByClassName('story-headline__title')[0].innerText
        else headline = document.getElementById('story-headline').innerText
        if (document.getElementsByClassName('author-module__heading').length > 0) byline = document.getElementsByClassName('author-module__heading')[0].firstElementChild.innerText
        else if (document.getElementsByClassName('story-info__byline').length > 0) byline = document.getElementsByClassName('story-info__byline')[0].innerText.slice(3)
        else byline = 'N/A'
        if (byline !== 'AFP') byline = byline.split(' ').map(x => toSentenceCase(x)).join(' ')
        outlet = 'The Australian'
        firstPara = document.getElementById('story-description').innerText
        document.getElementById('story-description').innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'AFR':
        if (document.getElementsByClassName('_2cOv8').length > 0) headline = document.getElementsByClassName('_2cOv8')[0].innerText
        else headline = document.getElementsByClassName('_3lFzE')[0].innerText
        if (document.getElementsByClassName('_1GUY1').length > 0) byline = document.getElementsByClassName('_1GUY1')[0].innerText
        else if (document.getElementsByClassName('_3JUfh').length > 0) byline = document.getElementsByClassName('_3JUfh')[0].innerText
        else if (document.getElementsByClassName('sLxGg').length > 0) byline = document.getElementsByClassName('sLxGg')[0].innerText
        else byline = 'None'
        outlet = 'Australian Financial Review'
        firstPara = document.getElementsByClassName('_3PsH9')[0].firstElementChild.innerText
        document.getElementsByClassName('_3PsH9')[0].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'SMH':
        if (document.getElementsByClassName('_3la2-').length > 0) headline = document.getElementsByClassName('_3la2-')[0].children[1].innerText
        else headline = document.getElementsByClassName('JwYux')[0].children[1].innerText
        if (document.getElementsByClassName('_1bFgK').length > 0) byline = document.getElementsByClassName('_1bFgK')[0].children[0].innerText
        else if (document.getElementsByClassName('_2FyET').length > 0) byline = document.getElementsByClassName('_2FyET')[0].innerText.slice(3)
        else byline = ''
        outlet = window.location.href.toString().startsWith('https://www.smh.com.au/') ? 'Sydney Morning Herald' : 'Age'
        firstPara = document.getElementsByClassName('_1665V')[0].firstElementChild.innerText
        document.getElementsByClassName('_1665V')[0].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'Brisbane Times':
        if (document.getElementsByClassName('_3la2-').length > 0) headline = document.getElementsByClassName('_3la2-')[0].children[1].innerText
        else headline = document.getElementsByClassName('JwYux')[0].children[1].innerText
        if (document.getElementsByClassName('_1bFgK').length > 0) byline = document.getElementsByClassName('_1bFgK')[0].children[0].innerText
        else byline = document.getElementsByClassName('_2FyET')[0].innerText.slice(3)
        outlet = outletName
        firstPara = document.getElementsByClassName('_1665V')[0].firstElementChild.innerText
        document.getElementsByClassName('_1665V')[0].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'CT':
        headline = document.getElementsByClassName('name headline')[0].innerText
        if (document.getElementsByClassName('story-header__author-name-link').length > 0) byline = document.getElementsByClassName('story-header__author-name-link')[0].innerText
        else byline = ''
        outlet = 'Canberra Times'
        if (document.getElementsByClassName('story-paragraph--lead').length > 0) {
            firstPara = document.getElementsByClassName('story-paragraph--lead')[0].innerText
            document.getElementsByClassName('story-paragraph--lead')[0].innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        }
        else {
            firstPara = document.getElementsByClassName('subscribe-truncate')[0].firstElementChild.firstElementChild.innerText
            document.getElementsByClassName('subscribe-truncate')[0].firstElementChild.firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        }
        return
    case 'News.com.au':
        if (document.getElementsByClassName('story-headline').length > 0) headline = document.getElementsByClassName('story-headline')[0].innerText
        else headline = 'N/A'
        if (document.getElementsByClassName('author-info').length > 0) byline = document.getElementsByClassName('author-info')[0].innerText
        else byline = ''
        outlet = 'News.com.au'
        firstPara = document.getElementById('story').children[1].innerText
        document.getElementById('story').children[1].innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'ADT':
        if (document.getElementsByClassName('tg-tlc-storyheader_titlewrapper_h1').length > 0) headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper_h1')[0].innerText
        else headline = document.getElementsByClassName('tg-tlc-storybody_intro')[0].firstElementChild.innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText
        outlet = 'Daily Telegraph'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'Courier Mail':
        headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper_h1')[0].innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText
        outlet = 'Courier Mail'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'HSM':
        headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper_h1')[0].innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText
        outlet = 'Herald Sun'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'MERH':
        headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper')[0].children[1].innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText
        outlet = 'Hobart Mercury'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'ADA':
        headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper')[0].children[1].innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText
        outlet = 'Adelaide Advertiser'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'NTN':
        headline = document.getElementsByClassName('tg-tlc-storyheader_titlewrapper')[0].children[1].innerText
        byline = document.getElementsByClassName('tg-tlc-storymeta_author')[0].firstElementChild.innerText.split(' ').map(x => toSentenceCase(x)).join(' ')
        outlet = 'Northern Territory News'
        firstPara = document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText
        document.getElementsByClassName('tg-tlc-storybody_intro')[1].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'WSTA':
        headline = document.getElementsByClassName('css-1ze5ky-StyledHeadline')[0].innerText
        byline = document.getElementsByClassName('css-12p8184-StyledTextLink-StyledBylineAuthor').length > 0 ? document.getElementsByClassName('css-12p8184-StyledTextLink-StyledBylineAuthor')[0].firstElementChild.innerText : ' '
        outlet = 'West Australian'
        firstPara = document.getElementsByClassName('css-1bgobxc-StyledBlockContent')[0].firstElementChild.innerText
        document.getElementsByClassName('css-1bgobxc-StyledBlockContent')[0].firstElementChild.innerText = `${headline}\n${outlet}\n${date}\n${byline}\n\n${firstPara}`
        return
    case 'Mando':
        if (ranAlready) return
        headline = document.getElementsByClassName('title')[0].children[1].innerText
        if (document.getElementsByClassName('author').length > 0 && document.getElementsByClassName('author')[0].childElementCount === 2) byline = document.getElementsByClassName('author')[0].firstElementChild.innerText
        else if (document.getElementsByClassName('author').length > 0) byline = document.getElementsByClassName('author')[0].innerText.slice(3)
        outlet = 'The Mandarin'
        firstPara = document.getElementsByClassName('article-body')[0].firstElementChild.innerText
        document.getElementsByClassName('article-body')[0].firstElementChild.innerText = `${headline}\n${outlet}\n${date}${byline}\n${firstPara}`
        ranAlready = true
        return
    default:
        break
    }
}

const toSentenceCase = (word) => word.split('').map((letter, index) => {
    if (index === 0) return letter.toUpperCase()
    else if ((word[0] === '"' || word[0] === '\'') && index === 1) return letter.toUpperCase()
    else return letter.toLowerCase()
}).join('')
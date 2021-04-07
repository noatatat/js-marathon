const player1 = {
    name: 'Sasha',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['vilka', 'lozhka', 'povarezhka'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const player2 = {
    name: 'Serozha',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['tarelka', 'vilka', 'lozhka'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const $arenas = document.querySelector('div.arenas');
createPlayer('player1', player1);
createPlayer('player2', player2);

function createPlayer(className, player) {
    const $divPlayer = createElementFromSelector(`div.${className}`);
    const $divProgressbar = createElementFromSelector('div.progressbar');
    const $divCharacter = createElementFromSelector('div.character');
    const $divLife = createElementFromSelector('div.life', [], [{ width: `${player.hp}%` }]);
    const $divName = createElementFromSelector('div.name', [{ innerText: player.name }]);
    const $img = createElementFromSelector('img', [{ src: player.img }]);
    appendElements($divCharacter, $img);
    appendElements($divProgressbar, $divLife, $divName);
    appendElements($divPlayer, $divProgressbar, $divCharacter);
    appendElements($arenas, $divPlayer);
}

function createElementFromSelector(selector, attributes = [], styles = [] ) {
    const [tag, cls] = selector.split('.');
    const $el = document.createElement(tag);
    if (cls) {
        $el.classList.add(cls);
    }
    attributes.forEach(attr => {
        let [attrKey, attrValue] = Object.entries(attr)[0];
        $el[attrKey] = attrValue;
    })
    styles.forEach(attr => {
        let [styleKey, styleValue] = Object.entries(attr)[0];
        $el.style[styleKey] = styleValue;
    })
    return $el;
}

function appendElements($parent, ...$els) {
    $els.forEach($el => $parent.appendChild($el));
}

const player1 = {
    player: 1,
    name: 'Sasha',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['vilka', 'lozhka', 'povarezhka'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const player2 = {
    player: 2,
    name: 'Serozha',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['tarelka', 'vilka', 'lozhka'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const $arenas = document.querySelector('div.arenas');
const $rndButton = document.querySelector('button.button');

$rndButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
});

appendElements($arenas, createPlayer(player1));
appendElements($arenas, createPlayer(player2));

function changeHP(player) {
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    const loss = Math.ceil(Math.random() * 20);
    const reducedHp = player.hp - loss;
    player.hp = reducedHp < 0 ? 0 : reducedHp;
    $playerLife.style.width = `${player.hp}%`;

    if (player.hp <= 0) {
        $rndButton.disabled = true;
        const winner = player.player === 1 ? player2 : player1;
        appendElements($arenas, playerWins(winner));
    }
}

function playerWins(player) {
    return createElementFromSelector('div.loseTitle', [{ innerText: `${player.name} wins` }]);
}

function createPlayer(player) {
    const $divPlayer = createElementFromSelector(`div.player${player.player}`);
    const $divProgressbar = createElementFromSelector('div.progressbar');
    const $divCharacter = createElementFromSelector('div.character');
    const $divLife = createElementFromSelector('div.life', [], [{ width: `${player.hp}%` }]);
    const $divName = createElementFromSelector('div.name', [{ innerText: player.name }]);
    const $img = createElementFromSelector('img', [{ src: player.img }]);
    appendElements($divCharacter, $img);
    appendElements($divProgressbar, $divLife, $divName);
    appendElements($divPlayer, $divProgressbar, $divCharacter);

    return $divPlayer;
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

import React from 'react';
import './App.css';
import {GuessWord} from "./components/GuessWord";

interface Props {}

interface State {
    status: 'playing' | 'win' | 'failed';
    answer: string;
    currGuessIdx: number;
}

const WORD_LENGTH = 5;
const MAX_TRY_TIMES = 6;
const WORD_LIST = [
    "pzazz",
    "jazzy",
    "buzzy",
    "fuzzy",
    "muzzy",
    "bezzy",
    "bizzy",
    "fizzy",
    "pozzy",
    "whizz",
    "zhuzh",
    "abuzz",
    "scuzz",
    "dizzy",
    "frizz",
    "huzza",
    "mezza",
    "mezzo",
    "pizza",
    "swizz",
    "wizzo",
    "hajji",
    "jujus",
    "tizzy",
    "jeuje",
    "lezzo",
    "squiz",
    "zanza",
    "zazen",
    "izzat",
    "jacky",
    "jeeze",
    "jumpy",
    "tazza",
    "tazze",
    "zizit",
    "jammy",
    "jemmy",
    "jiffy",
    "jimmy",
    "jimpy",
    "junky",
    "mujik",
    "muzak",
    "quack",
    "quick",
    "zappy",
    "zippy",
    "jacks",
    "janky",
    "jocko",
    "jocks",
    "jugum",
    "jumbo",
    "jumps",
    "kopje",
    "kudzu",
    "quaff",
    "quaky",
    "quiff",
    "zaxes",
    "zinky",
    "zuppa",
    "capiz",
    "enzym",
    "furzy",
    "jaggy",
    "jambe",
    "jambs",
    "jerky",
    "jibba",
    "jibbs",
    "jiffs",
    "jiggy",
    "jivey",
    "jokey",
    "jowly",
    "juicy",
    "juked",
    "jukus",
    "junks",
    "kanzu",
    "karzy",
    "khazi",
    "klutz",
    "pujah",
    "zebec",
    "ziffs",
    "zilch",
    "zincy",
    "zippo",
    "zombi",
    "bhaji",
    "boozy",
    "buxom",
    "cozey",
    "crazy",
    "fjeld",
    "fuzed",
    "fuzil",
    "jimpy",
    "jokey",
    "jujus",
    "jumby",
    "jumpy",
    "junky",
    "khoja",
    "kudzu",
    "kylix",
    "mauzy",
    "mazey",
    "qophs",
    "quich",
    "xerox",
    "yukky",
    "zhomo",
    "zilch",
    "zincy",
    "zymes",
    "affix",
    "azuki",
    "bikky",
    "capiz",
    "cobza",
    "ditzy",
    "doozy",
    "dzhos",
    "fazed",
    "flaxy",
    "fuzed",
    "gauzy",
    "ghazi",
    "glazy",
    "gyoza",
    "hazed",
    "hexyl",
    "hyrax",
    "jacks",
    "jaffa",
    "jeffs",
    "jiffs",
    "jivey",
    "jocko",
    "jocks",
    "jowly",
    "kanzu",
    "karez",
    "kazis",
    "kazoo",
    "kicky",
    "klutz",
    "kopje",
    "kranz",
    "kuzus",
    "kyack",
    "mujik",
    "nudzh",
    "ozeki",
    "pyxed",
    "quake",
    "quark",
    "quayd",
    "quirk",
    "quonk",
    "xylyl",
    "zaidy",
    "zakat",
    "zambo",
    "zayde",
    "zebec",
    "zebub",
    "zerks",
    "zikrs",
    "zimbi",
    "zimbs",
    "zingy",
    "zinke",
    "zippo",
    "zocco",
    "zokor",
    "zombi",
    "zonks",
    "zooks",
    "zoppa",
    "zoppo",
    "zouks",
    "zuppa",
    "zygal",
    "zygon",
    "zynga",
    "avize",
    "azoth",
    "azury",
    "bhaji",
    "boxty",
    "braxy",
    "bunjy",
    "calyx",
    "chawk",
    "choky"
];

export default class App extends React.PureComponent<Props, State> {
    guessRefs: (React.RefObject<GuessWord>)[];

    constructor(props: Props) {
        super(props);

        const randomIdx = Math.ceil(Math.random() * 10000) % WORD_LIST.length;
        this.state = {
            status: 'playing',
            answer: WORD_LIST[randomIdx],
            currGuessIdx: 0,
        };
        this.guessRefs = new Array(MAX_TRY_TIMES).fill(0).map(_ => React.createRef());
    }

    get currGuessRef() {
        return this.guessRefs[this.state.currGuessIdx];
    }

    componentDidMount() {
        console.log('DEBUG: answer is: ' + this.state.answer);
        console.log('DEBUG: example words: ');
        console.log(JSON.stringify(WORD_LIST.slice(0, 20), null, 4));
        document.addEventListener('keypress', this.onKeyboardPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.onKeyboardPress);
    }

    render() {
        const {answer} = this.state;

        return (
            <div className={'grid'}>
                {this.guessRefs.map((ref, idx) => <GuessWord ref={ref} answer={answer} wordList={WORD_LIST} wordLength={WORD_LENGTH} key={idx.toString()}/>)}
            </div>
        );
    }

    onKeyboardPress = (e: KeyboardEvent) => {
        if (e.charCode >= 97 && e.charCode <= 122) {
            this.input(e.key.toUpperCase());
        } else if (e.charCode >= 65 && e.charCode <= 90) {
            this.input(e.key);
        } else if (e.key === 'Enter') {
            this.submit();
        } else {
            this.delete();
        }
    }

    input(char: string) {
        this.currGuessRef?.current?.input(char);
    }

    delete() {
        this.currGuessRef?.current?.delete();
    }

    async submit() {
        const submitSuccess = await this.currGuessRef?.current?.submit();
        if (submitSuccess) {
            this.setState({
                currGuessIdx: this.state.currGuessIdx + 1,
            })
        }
    }
}

import React, {useEffect, useState} from 'react';
import './App.css';

const WORD_LENGTH = 5;
const MAX_TRY_TIMES = 6;

enum LetterStatus {
    Empty = 'empty',
    Inputting = 'inputting',
    Hit = 'hit',
    InWord = 'in-word',
    NotInWord = 'not-in-word',
}

interface Letter {
    letter: string;
    status: LetterStatus;
}

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

const randomIdx = Math.ceil(Math.random() * 10000) % WORD_LIST.length;
const ANSWER = WORD_LIST[randomIdx];
console.log('DEBUG: answer is: ' + ANSWER);
console.log('DEBUG: example words: ');
console.log(JSON.stringify(WORD_LIST.slice(0, 20), null, 4));

interface LetterProps {
    letter: string;
    status: LetterStatus;
}

const LetterCell: React.FC<LetterProps> =  ({letter, status}) =>  {
    return (
        <div className={`char char__${status}`}><span>{letter}</span></div>
    );
}

const SUBMITTED_STATUS = [LetterStatus.Hit, LetterStatus.InWord, LetterStatus.NotInWord];


export const WordleGrid: React.FC = () => {
    const [cursorIdx, setCursorIdx] = useState(0);
    const [rowNumber, setRowNumber] = useState(0);
    const [letters, setLetters] = useState<Letter[]>(() => new Array(MAX_TRY_TIMES * WORD_LENGTH).fill(() => ({letter: '', status: LetterStatus.Empty})));
    const rowStartIdx = rowNumber * WORD_LENGTH;
    const rowEndIdx = rowStartIdx + WORD_LENGTH - 1;

    const handleInput = (letter: string) => {
        if (cursorIdx > rowEndIdx) {
            return;
        }
        const prevRowLetter = letters[cursorIdx - WORD_LENGTH] || null;
        if (prevRowLetter && !SUBMITTED_STATUS.includes(prevRowLetter.status)) {
            return;
        }
        const target = letters[cursorIdx];
        if (!target) {
            return;
        }
        if (!target.letter)  {
            letters[cursorIdx] = {
                letter,
                status: LetterStatus.Inputting,
            }
            setLetters([...letters]);
            setCursorIdx(cursorIdx + 1);
        }
    }

    const handleDelete = () => {
        const prevCursorIdx = cursorIdx - 1;
        if (prevCursorIdx < rowStartIdx) {
            return;
        }
        const target = letters[prevCursorIdx];
        if (!target) {
            return;
        }

        if (target.letter && !SUBMITTED_STATUS.includes(target.status)) {
            letters[prevCursorIdx] = {
                letter: '',
                status: LetterStatus.Empty,
            }
            setLetters([...letters]);
            setCursorIdx(prevCursorIdx);
        }
    }

    const handleSubmit = () => {
        const targetRange = letters.slice(rowStartIdx, rowEndIdx + 1);
        const guess = targetRange.map(it => it.letter).join('').toLowerCase();
        if (guess.length < WORD_LENGTH) {
            window.alert('Not enough letters')
        } else if (!WORD_LIST.includes(guess)) {
            window.alert('Not in word list');
        } else {
            targetRange.forEach((it, idx) => {
                if (it.letter.toLowerCase() === ANSWER[idx]) {
                    it.status = LetterStatus.Hit;
                } else if (ANSWER.includes(it.letter.toLowerCase())) {
                    it.status = LetterStatus.InWord;
                } else {
                    it.status = LetterStatus.NotInWord;
                }
            })
            setLetters([...letters]);
            setRowNumber(rowNumber  + 1);
        }
    }

    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            if (e.charCode >= 97 && e.charCode <= 122) {
                handleInput(e.key.toUpperCase());
            } else if (e.charCode >= 65 && e.charCode <= 90) {
                handleInput(e.key);
            } else if (e.key === 'Enter') {
                handleSubmit();
            } else {
                handleDelete();
            }
        }

        document.addEventListener('keypress', keyPressHandler);

        return () => {
            document.removeEventListener('keypress', keyPressHandler);
        }
    }, [cursorIdx, letters, rowNumber]);

    return (
        <div className={'grid'}>
            {letters.map((it, idx) => <LetterCell key={idx.toString()} letter={it.letter} status={it.status} />)}
        </div>
    );
}

export default WordleGrid;

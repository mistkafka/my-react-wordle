import React from 'react';
import {CharCell} from "./CharCell";


interface Props {
    answer: string;
    wordList: string[];
    wordLength: number;
}

interface State {
    status: 'inputting' | 'submitted';
    cursorIdx: number;
}


export class GuessWord extends React.PureComponent<Props, State> {
    charRefs: (React.RefObject<CharCell>)[];

    constructor(props: Props) {
        super(props);

        this.state = {
            status: 'inputting',
            cursorIdx: 0,
        }

        this.charRefs = new Array(props.wordLength).fill(0).map(_ => React.createRef());
    }

    get prevCharRef() {
        return this.charRefs[this.state.cursorIdx - 1];
    }

    get currCharRef() {
        return this.charRefs[this.state.cursorIdx];
    }

    render() {
        const {answer} = this.props;

        return (
            <>
                {this.charRefs.map((ref, idx) => <CharCell key={idx} answer={answer} idx={idx} ref={ref} />)}
            </>
        );
    }

    public isSubmitted = () => this.state.status === 'submitted';

    public input = (char: string) => {
        if (this.currCharRef) {
            this.currCharRef.current!.input(char);
            this.setState({
                cursorIdx: this.state.cursorIdx + 1,
            });
        }
    }

    public delete = () => {
        if (this.prevCharRef) {
            this.prevCharRef.current!.delete();
            this.setState({
                cursorIdx: this.state.cursorIdx - 1,
            });
        }
    }

    public submit = async () => {
        const {wordLength, wordList} = this.props;
        const guess = this.charRefs
            .map(ref => {
                return ref.current!.getChar();
            })
            .join('')
            .toLowerCase();

        if (guess.length !== wordLength) {
            console.log('Not enough letters');
            return false;
        } else if (!wordList.includes(guess)) {
            console.log('Not in word list');
            return false;
        } else {
            await this.charRefs.reduce((prev, curr) => {
                return prev.then(() => {
                    return curr.current?.submit();
                });
            }, Promise.resolve());

            this.setState({
                status: "submitted",
            });
            return true;
        }
    }
}

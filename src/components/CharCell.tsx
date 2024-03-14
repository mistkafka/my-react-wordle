import React from 'react';


interface Props {
    answer: string;
    idx: number;
}

interface State {
    char: string;
    submitted: boolean;
}

export class CharCell extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            char: '',
            submitted: false,
        }
    }

    get status() {
        const {submitted} = this.state;
        const {idx, answer} = this.props;
        const char = this.state.char.toLowerCase();

        if (submitted) {
            if (answer[idx] === char) {
                return 'hit';
            } else if (answer.includes(char)) {
                return 'in-word';
            } else {
                return 'not-in-word';
            }
        } else {
            if (char) {
                return 'inputting';
            } else {
                return 'empty';
            }
        }
    }

    render() {
        const {char} = this.state;

        return (
            <div className={`char char__${this.status}`}><span>{char}</span></div>
        );
    }

    public input = async (char: string) => {
        if (this.state.submitted) {
            return;
        }

        await this.playInputAnimation();

        this.setState({
            char,
        });
    }

    public getChar = () => this.state.char;

    public delete = async () => {
        await this.playDeleteAnimation();
        this.setState({
            char: '',
        })
    }

    public submit = async () => {
        await this.playSubmitAnimation();
        this.setState({
            submitted: true,
        })
    }

    public playShakeAnimation = async () => {
        await mockAsync();
    }

    private async playInputAnimation() {
        await mockAsync();
    }

    private async playDeleteAnimation() {
        await mockAsync();
    }

    private async playSubmitAnimation() {
        await mockAsync();
    }
}

function mockAsync() {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    });
}



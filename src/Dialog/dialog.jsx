import './dialog.css'

export default function Dialog(props) {
    const { title, yesCallback, noCallback } = props;

    return (
        <div class="backdrop">
            <div class="square"></div>

            <div class="dialog">
                <div class="close-container">
                    <span class="close-icon">x</span>
                </div>
                <h1>{title}</h1>

                <p>
                    <button onClikc={yesCallback}>Yes</button>
                    <button onClick={noCallback}>No</button>
                </p>
            </div>
        </div>
    );
}
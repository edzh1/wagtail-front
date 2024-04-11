import React from "react";

function StreamField(props) {
    const streamField = props.value;
    let html = [];

    for (let i = 0; i < streamField.length; i++) {
        const field = streamField[i];

        if (field.type === "heading") {
            html.push(
                <div className="heading">
                    <div key={`${i}.${field.type}`}>
                        <h1>{field.value}</h1>
                    </div>
                </div>
            );
        } else if (field.type === "paragraph") {
            html.push(
                <div className="paragraph">
                    <div key={`${i}.${field.type}`}>
                        <div dangerouslySetInnerHTML={{ __html: field.value }}></div>
                    </div>
                </div>
            );
        } else if (field.type === "image") {
            html.push(
                <div className="image">
                    <div key={`${i}.${field.type}`}>
                        <img src={field.value.large?.fullUrl} />
                    </div>
                </div>
            );
        } else {
            // fallback empty div
            html.push(<div className={field.type} key={`${i}.${field.type}`} />);
        }
    }

    return html;
}

export { StreamField };

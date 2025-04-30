document.querySelector('button').addEventListener('click', makeReq)

function makeReq() {
    let choice = document.querySelector('#userInputs').value
    fetch(`/api?choice=${choice}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('h2').innerHTML = data.objToJson.outcome
        })
        .catch(err => console.error("Error:", err))
};

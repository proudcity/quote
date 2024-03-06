fetch('transformed.csv').then(res => res.text()).then(data => {
    data = data.split('\n');
    data.shift();
    data = [...new Set(data)];
    data = data.map(c => {
        const city = c.split(',');
        return [city[0], city[1], parseInt(city[2]), city[0].toLowerCase() + ', ' + (city[1] || '').toLowerCase()];
    }).sort((a, b) => b[2] - a[2]);

    let search = '';
    const results = document.getElementById('results');
    document.getElementById('city').onkeyup = e => {
        if (e.target.value && e.target.value != search)
            search = e.target.value;
        else
            return;

        results.innerHTML = '';
        let shown = 0;
        for (let i = 0; i < data.length && shown < 10; i++)
            if (data[i][3].includes(search)) {
                shown++;
                const element = document.createElement('li');
                element.innerText = data[i][0] + ', ' + data[i][1];
                element.onclick = () => alert(data[i][2] > 20000 ? Math.round(data[i][2] / 100) : 100)
                results.appendChild(element);
            }
    };
})
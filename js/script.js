document.getElementById("rgb").addEventListener("click", activateButton);
document.getElementById("shade").addEventListener("click", activateButton);
document.getElementById("clear").addEventListener("click", clearSketch);
document.getElementById("pixel").addEventListener("click", changePixels);

function changePixels()
{
    let num = parseInt(prompt("Please enter a number between 1 and 100", "16"));
    if(num < 100 && num > 0 && num !== "NaN")
    {
        let sketch = document.querySelector(".sketch");
        console.log(sketch);

        for(let i = 0; i < num; i++)
        {
            let column = document.createElement('div');
            column.className = "column";

            for(let j = 0; j < num; j++)
            {
                let row = document.createElement('div');
                row.className = "row";
                row.addEventListener('mouseover', changePixelColor);
                row.style.backgroundColor = "rgba(255, 255, 255, 1)";
                column.appendChild(row);
            }
            sketch.appendChild(column);
        }
    }
}

function changePixelColor(e)
{
    let rgb = document.getElementById("rgb");
    let shade = document.getElementById("shade");

    if(rgb.classList.contains("active") && shade.classList.contains("active"))
    {
        if(e.target.style.backgroundColor === "rgb(255, 255, 255)")
        {
            //do random colour
            let r = Math.floor(Math.random()*256);
            let g = Math.floor(Math.random()*256);
            let b = Math.floor(Math.random()*256);

            e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
        }
        else
        {
            let pixelColor = e.target.style.backgroundColor;
            let opacity = 0;

            let length = parseInt(pixelColor.length);

            opacity = parseFloat(pixelColor.slice(-4,-1));
            let newPixelColor = pixelColor.substring(0, (length-4));

            if(opacity === 0.9)
                newPixelColor = newPixelColor + 1 + ")";
            else
            {
                opacity = parseFloat(opacity + 0.1);
                newPixelColor = newPixelColor + opacity + ")";
            }
            e.target.style.backgroundColor = newPixelColor;
        }
    }
    else if(rgb.classList.contains("active"))
    {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);

        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else if(shade.classList.contains("active"))
    {
        if(e.target.style.backgroundColor === "rgb(0, 0, 0)")
        {
            return;
        }
        else if(e.target.style.backgroundColor === "rgb(255, 255, 255)") {
            e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
        }
        else {
            let fade = e.target.style.backgroundColor;
            let a = parseFloat(fade.slice(-4,-1));

            console.log(fade);

            if(a === 0.9)
                e.target.style.backgroundColor = "rgb(0,0,0)";
            else {
                a = a + 0.1;
                e.target.style.backgroundColor = `rgba(0,0,0,${a})`;
            }
        }
    }
    else
        e.target.style.backgroundColor = "rgb(0,0,0)";
}

function activateButton(e)
{
    if(e.target.className !== "bot-button active")
        document.getElementById(e.target.id).classList.add("active");
    else
        document.getElementById(e.target.id).classList.remove("active");
}

function clearSketch()
{
    let pixels = document.querySelectorAll(".row");
    pixels.forEach(pixel => pixel.style.backgroundColor = "rgb(255,255,255)");
}


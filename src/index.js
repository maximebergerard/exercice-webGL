import './css/style.styl'

console.log('Hello booy')



// Hot

if(module.hot)
{
    module.hot.accept()

    module.hot.dispose(() =>
    {
        console.log('dispose')

        document.body.removeChild($image)
    })
}
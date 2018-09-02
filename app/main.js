module.exports = function (app, fs, path) {
    function getFileList(path_) {
        let result = new Array()
        let items = fs.readdirSync(path_)

        items.forEach(element => {
            if(element[0] != '.')
                result.push({ name: element, directory: fs.existsSync(path_ + '/' + element + '/') ? 1 : 0 })
        })
        
        result.sort((a, b) => {
           return b.directory - a.directory
        })
        return result
    }

    function getExtension(name){
        if(name.search('.') != 0)
            return ''
        
        return name.substring(name.indexOf('.') + 1, name.length)
    }

    app.get('/*', (req, res) => {
        let param = req.param(0)
        let folderpath = path + '/' + param

        if (fs.existsSync(folderpath + '/')) {
            result = getFileList(folderpath)
            res.render('index', {
                files: result
            })
        } else {
            if(fs.existsSync(folderpath)){
                let extension = getExtension(folderpath)
                let noeDownload = ['txt', 'md', 'css', 'html', 'js', 'png', 'jpg', 'gif']
                if(extension != ''){
                    if(noeDownload.includes(extension))
                        res.sendFile(folderpath)
                    else
                        res.download(folderpath)
                }else
                    res.download(folderpath)
            }else
                res.send("<script> alert('No such file'); location.href='http://file.c2w2m2.com'; </script>")
        }
    })
}

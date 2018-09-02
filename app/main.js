module.exports = function (app, fs, path) {
    function getExtension(name){
        if(name.search('.') != 0)
            return ''
        
        return name.substring(name.indexOf('.') + 1, name.length)
    }

    function getType(extension){
        let img = ['png', 'jpg', 'gif']
        let txt = ['md', 'txt']
        let zip = ['zip', '7z', 'tar', 'gz']

        if(img.includes(extension))
            return 'image'
        else if(txt.includes(extension))
            return 'txt'
        else if(zip.includes(extension))
            return 'zip'
        else
            return 'file'
    }
    
    function getFileList(path_) {
        let result = new Array()
        let items = fs.readdirSync(path_)

        items.forEach(element => {
            if(element[0] != '.' && element != "js" && element != "css" && element != "img")
                result.push({ name: element, type: fs.existsSync(path_ + '/' + element + '/') ? 'folder' : getType(getExtension(element))})
        })
        
        result.sort((a, b) => {
            if (a.type == "folder") return 1
        })

        return result.reverse()
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
                let noDownload = ['txt', 'md', 'css', 'html', 'js', 'png', 'jpg', 'gif']
                if(extension != ''){
                    if(noDownload.includes(extension))
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


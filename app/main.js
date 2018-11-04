module.exports = (app, fs, path) => {

    require('./util')

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
                let noDownload = ['txt', 'md', 'css', 'html', 'js', 'png', 'jpg', 'gif', 'ico','py','c']
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

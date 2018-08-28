module.exports = function (app, fs, path) {
    function getFileList(path_) {
        let result = new Array()
        let items = fs.readdirSync(path_)

        items.forEach(element => {
            result.push({ name: element, directory: fs.existsSync(path_ + '/' + element + '/') ? 1 : 0 })
        })
        
        result.sort((a, b) => {
            /*
            if (a.directory == b.directory) return 0

            a.directory < b.directory ? 1 : -1
            */
           return b.directory - a.directory
        })
        return result
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
            if(fs.existsSync(folderpath))
                res.download(folderpath)
            else
                res.send("<script> alert('No such file'); location.href='http://file.c2w2m2.com'; </script>")
        }
    })
}
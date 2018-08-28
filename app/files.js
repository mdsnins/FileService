module.exports = function(app, fs, path){
    app.get('/download/:filename', (req, res) => {
        let filename = req.params.filename
        let filepath = path + '/' + filename

        if(fs.existsSync(filepath + '/')){
            res.send("<script> alert('This is folder'); location.href='http://file.c2w2m2.com'; </script>")
        }else if(fs.existsSync(filepath)){
            res.download(filepath)
        }else{
            res.send("<script> alert('No such file'); location.href='http://file.c2w2m2.com'; </script>")
        }  
    })

    app.get('/:folder', (req, res) => {
        let folder = req.params.folder
        let folderpath = path + '/' + folder
        if(fs.existsSync(folderpath + '/')){
            
        }else{
            res.send("<script> alert('This is file'); location.href='http://file.c2w2m2.com'; </script>")
        }
    })

}
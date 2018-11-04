module.exports = () => {
    function getExtension(name){
        if(name.search('.') != 0)
            return ''
        
        return name.substring(name.indexOf('.') + 1, name.length)
    }
    
    function getType(extension){
        let file_sig = {
            'img': [
                'png',
                'jpg',
                'gif',
                'ico'
            ],
            'txt': [
                'md',
                'txt'
            ],
            'zip': [
                'zip',
                '7z',
                'tar',
                'gz'
            ],
            'ppt':[
                'pptx',
                'ppt'
            ]
        }
        for(let i in file_sig){
            if(file_sig[i].includes(extension))
                return i
        }
        return 'file'
    }
    
    function getFileList(path_) {
        let result = new Array()
        let items = fs.readdirSync(path_)
    
        items.forEach(element => {
            if(element[0] != '.' && element != "js" && element != "css" && element != "img" && element != "private")
                result.push({ name: element, type: fs.existsSync(path_ + '/' + element + '/') ? 'folder' : getType(getExtension(element))})
        })
        
        result.sort((a, b) => {
            if (a.type == "folder") return 1
        })
    
        return result.reverse()
    }
}

exports.getImageUrl = (filename) => {
    const mode = process.env.NODE_ENV;
    
    if(mode === 'production'){
        return "https://sokoni-api.muckswon.com/uploads/" + filename;
    }

    if(mode === 'staging') {
        return "https://staging-sokoni-api.muckswon.com/uploads/" + filename;
    
    }

    return "http://localhost:2070/uploads/" + filename;

}
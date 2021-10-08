class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {

                const formData = new FormData();
                formData.append(
                    "files[]",
                    file,
                );

                return fetch(`http://localhost:8000/api/uploads/public/blog`, {
                    method: 'POST',
                    body: formData
                }).then(
                    response => response.json()
                ).then(data => {
                    this.loader.uploaded = true;
                    resolve({
                        default: `http://localhost:8000${data.data[0]}`
                    });
                }).catch(
                    error => console.log(error)
                );
            }));
    }


}

export default function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}
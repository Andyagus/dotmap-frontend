
    fetchModels = () => {
    this.state.locations.map(location => {
    fetch(`https://poly.googleapis.com/v1/assets?keywords=monkey&format=gltf&key=AIzaSyD6scPIQ_u-_5E62s6mYDvEt5vkWTHE0R4`)
    .then(resp => resp.json())
    .then(resp => {
    let armodel = resp.assets
    armodel = armodel.find(a => a.displayName.includes("monkey"))
    armodel = armodel.formats.find(a => a.formatType.includes("GLTF2"))
    let root = armodel.root.url
    let arr = [...this.state.modelUrl, root]
    this.setState({modelUrl: arr})
    })})}
module.exports = {
  getLocations: (description = '') => {
    if (description.includes('de')) {
      const [ from, to ] = description.replace('de ', '').split(' para ');
      return {
        from: from || '',
        to: to || ''
      }
    }
  }
}
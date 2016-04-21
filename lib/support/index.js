module.exports = function support(element) {
	element.style.display = 'flex';

	return element.style.display === 'flex';
};

export const productTitle = ({ gender, category, brand }) => {

    const getFormattedTitle = (gender, category, brand) => {
      // Словарь окончаний для согласования по роду
      const masculine = ['Футболка', 'Куртка', 'Рубашка', 'Кофта'];
      const neutral = ['Худи', 'Зип-худи', 'Свитшот'];
      const masculineAdj = ['Лонгслив', 'Джемпер', 'Топ'];
      const plural = ['Джинсы', 'Штаны', 'Джоггеры', 'Шорты', 'Головные уборы'];
  
      let formattedGender = gender;
      if (gender === 'Мужское') {
        if (masculine.includes(category)) formattedGender = 'Мужская';
        else if (neutral.includes(category)) formattedGender = 'Мужское';
        else if (masculineAdj.includes(category)) formattedGender = 'Мужской';
        else if (plural.includes(category)) formattedGender = 'Мужские';
      } else if (gender === 'Женское') {
        if (masculine.includes(category)) formattedGender = 'Женская';
        else if (neutral.includes(category)) formattedGender = 'Женское';
        else if (masculineAdj.includes(category)) formattedGender = 'Женский';
        else if (plural.includes(category)) formattedGender = 'Женские';
      }
  
      const formattedCategory = category.toLowerCase();
      return `${formattedGender} ${formattedCategory} ${brand}`;
    };
  
    return getFormattedTitle;
}
const tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        chatId: tg.initDataUnsafe?.user?.id
    }
}

// useEffect(() => {
//     const getProducts = async () => {

//         const data = {
//             queryId,
//             user
//         }
        
//         try {

//             const response = fetch('https://bottg-lucky-bro4.amvera.io/products', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data)
//             })
//             console.log(response)

//             setProducts(response.products)
//             if (response.successOrder) {
//                 setCosts(180)
//                 if (response.chainOrder) {
//                     setClosedChainOrder(true)
//                 }
//             }
//         } catch (e) {
//             console.log('Ошибка при получении списка товаров:', e)
//         }
//     }

//     getProducts();
// }, [])

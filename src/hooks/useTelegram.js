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

    const showAlert = () => {
        tg.showAlert('Для заказа доступно до 5 вещей. После осмотра вы сможете оставить 4 из них.')
    }

    return {
        onClose,
        onToggleButton,
        showAlert,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}

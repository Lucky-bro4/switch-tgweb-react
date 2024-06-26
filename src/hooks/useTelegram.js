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
        tg.showAlert('Для выбора доступно максиму 5 вещей. 4 из них вы сможете оставить')
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

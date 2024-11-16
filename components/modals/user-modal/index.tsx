import { DialogUser , DialogContentUser } from "@/components/ui/dialog-user";
import { userUserModal } from "@/hooks/use-user-modal"; 
import { ListCardUser } from "./component/list-card-user";
export const UserModal = () => {
    const isOpen = userUserModal((state) => state.isOpenUser);
    const onClose = userUserModal((state) => state.onCloseUser);

    return (
        <DialogUser open={isOpen} onOpenChange={onClose}>
            <DialogContentUser>
                <div className="container">
                    <ListCardUser />
                </div>
            </DialogContentUser>
        </DialogUser>
    )
}
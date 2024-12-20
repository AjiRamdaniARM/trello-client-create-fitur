import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full  p-4 border-t bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <div className="space-x-4 flex items-center">
                   
                        <Button size="sm" variant="ghost">
                          Privacy Police 
                        </Button>  
                        <Button size="sm" variant="ghost">
                            Terms of Service 
                        </Button>   
                </div>
            </div>
        </div>
    );
};

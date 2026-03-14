/**
 * Simple Toast Implementation to avoid complex shadcn dependencies when registry is unavailable
 */
export const useToast = () => {
  const toast = ({ title, description, variant, action }: any) => {
    // In a full implementation this would use a robust provider
    // For MVP prototyping without shadcn toast script, we fallback to standard alerts 
    // or console if browser doesn't support clean popups
    if (typeof window !== 'undefined') {
       if (variant === 'destructive') {
           console.error(`[CRITICAL ALERT] ${title}: ${description}`);
       } else {
           console.log(`[ALERT] ${title}: ${description}`);
       }
    }
  };

  return { toast };
};

export const ToastAction = ({ children }: any) => {
  return <button>{children}</button>;
};

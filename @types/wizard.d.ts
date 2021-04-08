namespace Wizard {
  interface StepProps {
    nextStep?: string;
    previousStep?: string;
    storeKey: SiteVariant;
    otherSteps?: CommonJSON<any>;
    metadata?: CommonJSON<any>;
  }

  interface Step<P = StepProps> {
    path: string;
    componentPath: string;
    props?: P;
  }
}

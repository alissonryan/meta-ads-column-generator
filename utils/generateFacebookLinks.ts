interface FacebookLinkParams {
  adAccountId: string;
  businessId: string;
}

export function generateFacebookLinks({ adAccountId, businessId }: FacebookLinkParams) {
  const baseUrl = 'https://adsmanager.facebook.com/adsmanager/manage/campaigns';
  
  const padraoResultados = `${baseUrl}?act=${adAccountId}&business_id=${businessId}&nav_entry_point=ads_ecosystem_navigation_menu&columns=name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cactions%3Alink_click%2Ccost_per_action_type%3Alink_click%2Cwebsite_ctr%3Alink_click%2Cunique_actions%3Alink_click%2Cunique_link_clicks_ctr%2Cattribution_setting&attribution_windows=default&breakdown_regrouping=true&nav_source=ads_manager`;

  const visaoEcommerce = `${baseUrl}?act=${adAccountId}&business_id=${businessId}&nav_entry_point=ads_ecosystem_navigation_menu&columns=name%2Cdelivery%2Cbudget%2Cspend%2Cresults%2Ccost_per_result%2Cactions%3Aomni_purchase%2Ccost_per_action_type%3Aomni_purchase%2Caction_values%3Aomni_purchase%2Cactions%3Aomni_add_to_cart%2Ccost_per_action_type%3Aomni_add_to_cart%2Creach%2Cimpressions%2Ccpm%2Cfrequency%2Cactions%3Alink_click%2Ccost_per_action_type%3Alink_click%2Cwebsite_ctr%3Alink_click%2Cunique_actions%3Alink_click%2Cunique_link_clicks_ctr%2Cattribution_setting&attribution_windows=default&date=2024-10-27_2024-11-03%2Clast_7d&comparison_date=&insights_date=2024-10-27_2024-11-03%2Clast_7d&insights_comparison_date=&breakdown_regrouping=true&nav_source=no_referrer`;

  return {
    padraoResultados,
    visaoEcommerce
  };
} 
import { SessionType, PortfolioItem, FAQItem, ServiceItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    titleKey: 'services.couples.title',
    descriptionKey: 'services.couples.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBorkDhjFgDZLV0gKp_1yqRjIJ00Nl4_HuKJtSgLaas4gZ5DWz3oYydsrAiVKjAg4C2rNEks7OObW1Ru95r4cUuRah7ddoW2iFTUtb9UFVo7RvCDZN8H3PDDltOW3tiUxGEyMP_rGytlJav4gEOmDcP88CvuW9gcd8ZXZtZPaSqQi4oJNd9OK8-ZoZ7Sux4dnqTlqeqSEgmlG-FcsQtRWVyun_OqiHKtrX2AMqGDkw8wc17uw2iqKkxQsj5ZaVWWMYSHobzOzlBzawx'
  },
  {
    id: 's2',
    titleKey: 'services.family.title',
    descriptionKey: 'services.family.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1jrteAEgxJWtO9dZHJEJSwpY7hUF5EZEBFLrxGPS2XX5KKjNkV-I9BfiIrDtiwHyzXRu9WnCid6fI4pQEbHJhM1Gt0V1AYDPDe4R8kLeR4RBDVKnSqcfAMCZoUM_QiKH3Rq597aymi5-7sZm4Y0giK20klg56dlnXJlPO1USP7J8zGjRvYHTwKHqOx9e4E1gs7rRzAThqTvsl3UaYEuue4TdxKzLeBbNKPHR0da3zpQ2n7NapdVwFebm6stWKFXzxIPyILDtjea_h'
  },
  {
    id: 's3',
    titleKey: 'services.lifestyle.title',
    descriptionKey: 'services.lifestyle.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA0xtbODlbYb4SnUx7UDeMLuLtDBpl1zJ7fldhoZi_3WZMcO4BFGEKuvoi5odtGH6Irvnd_aq38o1M-aznMC9uVyB_LEEu9i2EeBaaw9RVWvMb7AWcfSJKYebLnFqFowqMPqqEmMSw_VI63k0BXsSSk6kyvds11wd1Yy5_RHDHAx_OFjSKj6SxnpQ-mdOxFktOdept5WFBmgdcA7mOWRo8fBBlTO6MI-VepLbg-PLpJJicl1iElmSQosieIz-Y6XXyvXZCpmamWxmF'
  },
  {
    id: 's4',
    titleKey: 'services.restaurants.title',
    descriptionKey: 'services.restaurants.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCie9kIpeJwgVW4xTsJM9eKaZEjgIyjPJGqBkLNxfPT4s8sH47tKLNt_vKq_fUSmBVnStncawY9bOBuXExCD36E_wqiiPlBPdFaOhgnR9whOBgiJuQl6z1djx53wAAwD7VVhFnzMR4m9fCMGX4k6_8ewDLBo3OZ5ItNYEWBVSF59kcYOWHJWamcfN2wyDtBW-ouG6GrLZ1b9a58GHl3_Vbo3yALOngB8V1o5YNX-p2Vk6XESrsXCntsxE2VeduHTaVOeKWbcTQ1IWLx'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    titleKey: 'portfolio.items.sunset.title',
    category: SessionType.COUPLES,
    descriptionKey: 'portfolio.items.sunset.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnPFIXFPONYv0mHrtpW_Qs57vmy8N9HMaFXsV-MRABhMHBbnfFIAfiB8J4uMlhchCOXlFI3CBBwm1qi9Z_xIit43THi-vp3yi_uVf0qqxkfP2zCEjQCYpktKEnx9h0VnmiRQ9ru3cFadWlOxWvbhsJKowrpLG7Nt9ohOPndRSU27wDe9gh7idTAYbRCsnj3CaLCefEUjVG1S3xnR3CRXE4L80H99ajTb3g3JSQhxtwYiwU589RQMIgpl4UuLTreJkIe9_A446P9RAP'
  },
  {
    id: 'p2',
    titleKey: 'portfolio.items.blueDomes.title',
    category: SessionType.LIFESTYLE,
    descriptionKey: 'portfolio.items.blueDomes.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBuIp_v2CWFXEl2NjmwmHjKsw6-BhX_t5Dx3AHHIO30Wc39JnQLDwjiFOx5Ipc7_9kYXvvgrBB-OFBBQIRAgKu-ne9kIym2msTjhgx7n6MKbEd2qJo9s47Yp6T5BZPYvgotcV5CuZ5GJKq8gw9Qj5HKI_lCtQFlVO6U7bN8pHqLpAanjBws4ZzWlZ1rB_f3FTaQygX-XZu3cLjLx2--PewpsdrcWYrneXCsJ6bdtKLa5GgfLO6jXIIaKyQNr92M3zx-t5w0BwER9rV'
  },
  {
    id: 'p3',
    titleKey: 'portfolio.items.alleys.title',
    category: SessionType.LIFESTYLE,
    descriptionKey: 'portfolio.items.alleys.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmEsL-7ZIj9I2Qc3GOS9TGZqyQyE6OM0jPuMB6xdaovxjG4XvCqhdnmEoo5ePiljvTcELfm8GrtNhaPhcyS2pDYTNRMo0jwdUpWKOYD0GiAGk-vCSs7L0ssE-YwvGpVWIf93o0pZvwylbldEUXARgAbRaLjnaXx2yaYFLb-15VIaI84YV5anpHykCM7Ut96aeqdKksAti-PELp9-XvaKpmuU4_cHznPS5Snn9dv9FD1JAlYT-BFfAS4l2n0_kQART0BGCu6gPVW3Y5'
  },
  {
    id: 'p4',
    titleKey: 'portfolio.items.culinary.title',
    category: SessionType.RESTAURANTS,
    descriptionKey: 'portfolio.items.culinary.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkatpTgqNKHeM-0Rpes8AxWb5deTD2GCAAMLMsjPw_Qff8aonLUBl877qDCW9w9djbBA0CoEXlAgLUMiP4Drj9gLIT8mLNv5lgG6lLa4-hPfVFqrPMVlNrhRk5_hf9qJdr2T4vopk4ybtcKANUJ7WKVUN8N_dLwZ_MVKJTJKQ2Q8kPW08lvyG8jQJKLoLCv0I9UfRr-xHj5pEa56MV3IK0mVrUIyP8xeZZuAbDidSWmupR-cAad2ziRQ0qhzRVEYKuguAYUheSqHgH'
  },
  {
    id: 'p5',
    titleKey: 'portfolio.items.wedding.title',
    category: SessionType.COUPLES,
    descriptionKey: 'portfolio.items.wedding.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEME6dx1GxclHhUklZkyYzJZtdYT-ccdPe8bgM6ynxc6cg-NpMIKxn4vXSrfg-_MIBOrAEsIc73i92CeSZwIydjjLa0aCntjt5_5gCkLdfAZrBeUwSGNckZNhRYP7ndNKbzrVEnpsRy6mdZlbYfRpCpr5MJTWMZN6wUAEAftP_0YvWAoGZLDYDkS_c4qqjtFfghqkXqBdKQug9CY3jLfkcvz37KIC2vK9meHjSXiKiG06cD8THEiYKO_Lvo0Asi7lihcJLW7-6YKad'
  },
  {
    id: 'p6',
    titleKey: 'portfolio.items.family.title',
    category: SessionType.FAMILY,
    descriptionKey: 'portfolio.items.family.description',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrltrlKFWx1PcTkAp330JmbymmQ8U18yRFvqdE2XVS320lhuPCvwPO-NGE7A5Z2M3wjGohGK13iffUgFlcdpHFuS3N_fS0XbK8P3VE8nbTXtgV09geE45wQmUxWWJu6g9JoGtFZWEA-KKqoHmLaK0vkUEHhUyi7-ZUCgcWwRkjpSsSoTVf6kchBDUkjygAlOXSoA3QB4tFvGIF8Vv4J4brBKcThl3H7b9CtcE34SNLwZIaGI3-CBxbBoMmxREkoB9KbBVKKKJ9PWyN'
  }
];

export const FAQ: FAQItem[] = [
  {
    questionKey: 'faq.turnaround.question',
    answerKey: 'faq.turnaround.answer'
  },
  {
    questionKey: 'faq.bestTime.question',
    answerKey: 'faq.bestTime.answer'
  },
  {
    questionKey: 'faq.wardrobe.question',
    answerKey: 'faq.wardrobe.answer'
  },
  {
    questionKey: 'faq.booking.question',
    answerKey: 'faq.booking.answer'
  }
];

export const HERO_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzChj1CdTCSZt73wYEpwgKkoH0y2ENfjOVndfEy6UMP4vdASxYf-xV8GR1IqrpTJshnjMxf6rHVrDUr_LfTZmixJxsC0Y3caEklu-Bqd8DfC3YoQotD3Bc8mZKzIeAG9-vSnsuZ1xjYg2JiDl-HUuvNGxizQqTVjiW4k2SuMMTWfJWPr1zMTxgHJJ3Z1ZV8BMEHEYYiJnN9f_BlRoUBEoe19yKY0CP2W1OLj8nIqOSMwuwf3n8fVJRExrIKOWdFjwRkSOKDt23pp7X';
export const ALEX_PORTRAIT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlnJnlKCq3owb6FFCJ6pyn3Xab_HcZpwKp8Nzo-GN8YBhQn9Ri4BBD9U0CDV0z3T6zV3IWkZVzs32mC4yZgYByB04bz-YK1lX7vkqaRt-Uz4aROa3_i82ZZM39bi6FhiUH41vPRNq-kW-2WRxRTJOWlSqgu6m8lwMQp3qeF59L9sMty7wFTGppD22rwp6aTymZr1ItCCTsbYovgFIgDazhbPyIrMnRl8tvgZ2IjADk7CVq9iY42hVlhhVrFcoxJKRGOU3n55MQCTs';
export const ELENA_PORTRAIT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_CyzmGuFy0IipXiiDmKh_AuNJcMwKi16oTUFQQikllpvILuVUlTlnwYgnReEMTMV0TYwONmLkP9oSNwVZuCfUJl_2t_QKTEUd1DIwjJSHpH636uuY0kIv1oNv5j_oyuONM8mXWoGIu4ORy5gp48KyKJqnITVob-em07Jl1vzRozFJOskbwf_WvBnbDANiZfXGT_QyWwHTzyIRGlvTy3F7JM9emlv_IytEQSuroSK7qKduUEPbYexuoaAQFAuczmtZqo25tyCryTpb';
export const CALDERA_WIDE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcoEnu5HRIP_QbSTZPgIShA40D7M6FC7Bj3CXUyVW-iILvdB5nszVCg6NEqkpQOU6G2Uzxb36F4U993u9PFpHl0icW1bOJcfR-086WLkHnd7ddfd26Ccody1uDKBkg_wy5XVyIdpudlm5152X9__aVizXmFhrVm4rGE8fae881CM1z30qwHE35i5mmFNl4EM-2l-2ebHp-SKWtU1as7RuCLCH84Y9NHc1_k1ym_v76DuW5bkaLcE_SAogRhs5GoSAXdzCQonNB80PI';

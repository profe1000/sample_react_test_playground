const data = {
  data: {
    id: "demo",
    type: "households",
    attributes: {
      address_1: "123 Demonstration Boulevard",
      address_2: "Apartment #3",
      city: null,
      state: "AA",
      postal_code: "00000",
      country: "Canada",
      number_of_residents: null,
      has_24_hr_power: false,
      monthly_budget: 100000.0,
      monthly_grid_budget: null,
      monthly_gen_budget: null,
      usage_data: {
        gen_cost_today: 1719.0304081444235,
        grid_cost_today: 540.8865716000943,
        gen_usage_today: 5.933840949738929,
        grid_usage_today: 22.53694048333726,
        gen_cost_this_month: 93848.26616055459,
        grid_cost_this_month: 7281.495502534347,
        gen_hours_today: 5.0,
        grid_hours_today: 8.0,
      },
      household_type: null,
      tenant_type: null,
      automated_switching: false,
      nickname: "Demonstration",
      user_is_admin: false,
      user_is_writer: false,
      monthly_grid_expense: null,
      monthly_gen_expense: null,
      address: {
        id: 21,
        street_number: "7A",
        route: "Milverton Road",
        locality: null,
        administrative_area_level_2: "Ikoyi",
        administrative_area_level_1: null,
        administrative_area_level_1_code: "Lagos",
        country: "Nigeria",
        country_code: "NG",
        postal_code: null,
        latitude: 6.450175,
        longitude: 3.444995,
        formatted_address: null,
        found_via: "manual_input",
        created_at: "2020-05-13T04:24:08.122Z",
        updated_at: "2020-05-13T04:24:08.182Z",
      },
      has_gen: null,
      automatic_mode_available: false,
      automatic_mode: false,
      energy_system_id: "dda649e6-4f2d-492a-8210-929079ffc03b",
      active_features: [],
      user_nickname: "Demonstration",
      has_power_switching_schedule: null,
    },
    relationships: {
      devices: {
        data: [
          {
            id: "solstice-demo",
            type: "devices",
          },
          {
            id: "solstice-demo-studer",
            type: "devices",
          },
          {
            id: "solstice-demo-netbiter",
            type: "devices",
          },
        ],
      },
      users: {
        data: [
          {
            id: "100",
            type: "users",
          },
        ],
      },
      generator: {
        data: null,
      },
      grid_connection: {
        data: null,
      },
      inverter: {
        data: null,
      },
      solar_system: {
        data: null,
      },
    },
  },
  included: [
    {
      id: "solstice-demo",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "shyft",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
    {
      id: "solstice-demo-studer",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "studer_xcom",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
    {
      id: "solstice-demo-netbiter",
      type: "devices",
      attributes: {
        admin_pin: null,
        user_is_admin: false,
        online: true,
        device_type: "netbiter",
      },
      relationships: {
        household: {
          data: {
            id: "demo",
            type: "households",
          },
        },
      },
    },
  ],
};

const errresponse = {
  errors: [
    {
      id: "household",
      title: "Not Found",
    },
  ],
};

const profileresponse = {
  data: {
    id: "120",
    type: "users",
    attributes: {
      first_name: "Developer",
      last_name: "Jones",
      email: "interviews@shyftpower.com",
      phone: null,
      app_flags: [],
      middle_name: null,
      username: null,
      primary_team_membership_id: 27,
      primary_team_permissions: "multi_site_viewer",
      auth_token: "zUKWzuo6UBFT-nu4HVmk",
    },
    relationships: {
      households: {
        data: [
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "9",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "17",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "55",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "56",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "59",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "60",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "61",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "62",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "63",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "64",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "65",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "66",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "67",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "100",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "101",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "102",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "103",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "104",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "105",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "106",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "107",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
          {
            id: "108",
            type: "households",
          },
        ],
      },
      devices: {
        data: [
          {
            id: "sh-KS6H8g",
            type: "devices",
          },
          {
            id: "nb-3HC38g",
            type: "devices",
          },
          {
            id: "stx-8nnbmQ",
            type: "devices",
          },
          {
            id: "sma-7UbW4g",
            type: "devices",
          },
          {
            id: "sh-6iiGUQ",
            type: "devices",
          },
          {
            id: "gro-LR19GQ",
            type: "devices",
          },
          {
            id: "nb-rCW25g",
            type: "devices",
          },
          {
            id: "sh-kJbAVQ",
            type: "devices",
          },
          {
            id: "sh-GeTofg",
            type: "devices",
          },
          {
            id: "nb-stYZAw",
            type: "devices",
          },
          {
            id: "smx-t8hCqA",
            type: "devices",
          },
          {
            id: "nb-btHGVA",
            type: "devices",
          },
          {
            id: "vic-7zno2w",
            type: "devices",
          },
          {
            id: "sh-sT_q5g",
            type: "devices",
          },
          {
            id: "sma-STLjag",
            type: "devices",
          },
          {
            id: "sh-jrsfvQ",
            type: "devices",
          },
          {
            id: "scg-9xHuxg",
            type: "devices",
          },
          {
            id: "fsw-rUhM6A",
            type: "devices",
          },
          {
            id: "sh-ZyYnyQ",
            type: "devices",
          },
          {
            id: "fsw-_77rpw",
            type: "devices",
          },
          {
            id: "sh-Ku8Hsw",
            type: "devices",
          },
          {
            id: "gxs-XvyFeQ",
            type: "devices",
          },
          {
            id: "vic-g1Jqkg",
            type: "devices",
          },
          {
            id: "nb-xj3T_A",
            type: "devices",
          },
          {
            id: "vic-2AUgWA",
            type: "devices",
          },
          {
            id: "sh-FBi41w",
            type: "devices",
          },
          {
            id: "gxs-doW8YQ",
            type: "devices",
          },
          {
            id: "sh-u5hP1w",
            type: "devices",
          },
          {
            id: "sh-1io8uw",
            type: "devices",
          },
          {
            id: "snk-kHsbPQ",
            type: "devices",
          },
          {
            id: "snk-K_YdaQ",
            type: "devices",
          },
          {
            id: "sh-s3J2jg",
            type: "devices",
          },
          {
            id: "gxs-DP-svQ",
            type: "devices",
          },
          {
            id: "sh-6nJitA",
            type: "devices",
          },
          {
            id: "gxs-AZ5ZPg",
            type: "devices",
          },
          {
            id: "gxs-mon9cQ",
            type: "devices",
          },
          {
            id: "sh-PaywCA",
            type: "devices",
          },
          {
            id: "gro-SzB97A",
            type: "devices",
          },
          {
            id: "sh-kuokww",
            type: "devices",
          },
          {
            id: "sh-zjypdg",
            type: "devices",
          },
          {
            id: "gxs-HVCFxw",
            type: "devices",
          },
          {
            id: "gxs-hEBsrg",
            type: "devices",
          },
          {
            id: "sh-TV1asA",
            type: "devices",
          },
          {
            id: "gxs-Q4TxNw",
            type: "devices",
          },
          {
            id: "gxs-Emcv2g",
            type: "devices",
          },
          {
            id: "sh-_DH6RA",
            type: "devices",
          },
          {
            id: "gxs-bHZGyg",
            type: "devices",
          },
          {
            id: "gxs-1DmDaA",
            type: "devices",
          },
          {
            id: "sh-EtJMig",
            type: "devices",
          },
          {
            id: "sh-FTkUtg",
            type: "devices",
          },
          {
            id: "sma-P7sbyA",
            type: "devices",
          },
          {
            id: "sh-So69pQ",
            type: "devices",
          },
        ],
      },
      nps_surveys: {
        data: [],
      },
      teams: {
        data: [
          {
            id: "2",
            type: "teams",
          },
        ],
      },
      primary_team: {
        data: {
          id: "2",
          type: "teams",
        },
      },
    },
  },
  included: [
    {
      id: "2",
      type: "teams",
      attributes: {
        name: "SHYFT Power Solutions",
        industry_type: "Energy/Power",
        industry_company_type: "Energy services provider",
        active_feature_flags: [
          {
            name: "scheduling",
            active: true,
          },
        ],
        new_fuel_management_available_enabled: true,
      },
      relationships: {
        properties: {
          data: [
            {
              id: "9",
              type: "properties",
            },
            {
              id: "17",
              type: "properties",
            },
            {
              id: "55",
              type: "properties",
            },
            {
              id: "56",
              type: "properties",
            },
            {
              id: "59",
              type: "properties",
            },
            {
              id: "60",
              type: "properties",
            },
            {
              id: "61",
              type: "properties",
            },
            {
              id: "62",
              type: "properties",
            },
            {
              id: "63",
              type: "properties",
            },
            {
              id: "64",
              type: "properties",
            },
            {
              id: "65",
              type: "properties",
            },
            {
              id: "66",
              type: "properties",
            },
            {
              id: "67",
              type: "properties",
            },
            {
              id: "100",
              type: "properties",
            },
            {
              id: "101",
              type: "properties",
            },
            {
              id: "102",
              type: "properties",
            },
            {
              id: "103",
              type: "properties",
            },
            {
              id: "104",
              type: "properties",
            },
            {
              id: "105",
              type: "properties",
            },
            {
              id: "106",
              type: "properties",
            },
            {
              id: "107",
              type: "properties",
            },
            {
              id: "108",
              type: "properties",
            },
          ],
        },
        users: {
          data: [
            {
              id: "93",
              type: "users",
            },
            {
              id: "99",
              type: "users",
            },
            {
              id: "113",
              type: "users",
            },
            {
              id: "114",
              type: "users",
            },
            {
              id: "115",
              type: "users",
            },
            {
              id: "116",
              type: "users",
            },
            {
              id: "94",
              type: "users",
            },
            {
              id: "120",
              type: "users",
            },
            {
              id: "122",
              type: "users",
            },
            {
              id: "123",
              type: "users",
            },
            {
              id: "124",
              type: "users",
            },
            {
              id: "125",
              type: "users",
            },
            {
              id: "126",
              type: "users",
            },
            {
              id: "127",
              type: "users",
            },
            {
              id: "160",
              type: "users",
            },
            {
              id: "161",
              type: "users",
            },
            {
              id: "162",
              type: "users",
            },
            {
              id: "163",
              type: "users",
            },
            {
              id: "164",
              type: "users",
            },
            {
              id: "117",
              type: "users",
            },
            {
              id: "100",
              type: "users",
            },
            {
              id: "166",
              type: "users",
            },
            {
              id: "203",
              type: "users",
            },
            {
              id: "204",
              type: "users",
            },
            {
              id: "205",
              type: "users",
            },
            {
              id: "206",
              type: "users",
            },
            {
              id: "207",
              type: "users",
            },
            {
              id: "121",
              type: "users",
            },
            {
              id: "208",
              type: "users",
            },
            {
              id: "209",
              type: "users",
            },
            {
              id: "210",
              type: "users",
            },
            {
              id: "213",
              type: "users",
            },
          ],
        },
      },
    },
  ],
};

export default function getmockresult(index) {
  if (index === 200) {
    return data;
  }

  if (index === 201) {
    return profileresponse;
  }

  if (index === 404) {
    return errresponse;
  }

  return null;
}

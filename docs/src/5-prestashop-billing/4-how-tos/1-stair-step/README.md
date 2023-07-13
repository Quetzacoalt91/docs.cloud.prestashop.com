# Implementing a Stair-step pricing model

[Our main Tutorial](../3-tutorial/README.md) presented you with the required steps to implement any of our supported pricing models, but more informations are needed in the [context](#context) for a Stair-step pricing model, which will be explained by this tutorial.

:::warning
This tutorial assumes that you have already familiarized yourself with our [webhook system](../3-tutorial/README.md#responding-to-our-webhooks), which is necessary to implement the [second part](#second-step-updating-the-subscription-via-api) of this tutorial.
:::

## First step: Implementing it in the module
As Stair-step requires a unit to operate, you should pass that information during the initialization of `window.psBilling`, like so:

```js
<script>
  const context = { ...window.psBillingContext.context, product: { components: [
    {
      id: 'my-price-EUR-monthly', // This is an exemple and should be replaced with your id
      unitDescription: 'user' // This is an exemple and should be replaced with your unit description
    }
  ]}};
  window.psBilling.initialize(context, '#ps-billing', '#ps-modal', (type, data) => {
      // Event hook listener
      switch (type) {
        // Hook triggered when PrestaShop Billing is initialized
          case window.psBilling.EVENT_HOOK_TYPE.BILLING_INITIALIZED:
              console.log('Billing initialized', data);
              break;
        // Hook triggered when the subscription is created or updated
          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
              console.log('Sub updated', data);
            break;
        // Hook triggered when the subscription is cancelled
          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CANCELLED:
              console.log('Sub cancelled', data);
              break;
      }
  });
</script>
```
Here are two example of how this `unitDescription` property renders in Billing component:

![unitDescription screenshot 1](/assets/images/billing/unit-description-screenshot-1.png)
![unitDescription screenshot 2](/assets/images/billing/unit-description-screenshot-2.png)

The `id` property should have been communicated to you beforehand (as the [subscription item](../2-concepts/README.md#subscription-item) id, which can also be found in our webhook [subscription events.](../5-references/1-webhook/README.md#subscription))

## Second step: Updating the subscription via API

Since a Stair-Step pricing model requires the update of the unit per subscription before the renewal of said subscription, we provide an endpoint to do so:

`https://api.billing.prestashop.com/v1/subscriptions/{subscriptionId}/items/{subscriptionItemId}/quantity`

You can find both path parameters in the events sent by our webhooks:
- `subscriptionId` can be found as `data.subscription.id` in the payload of all [subscription events.](../5-references/1-webhook/README.md#subscription)
- `subscriptionItemId` can be found as `data.subscription.subscription_items[0].item_price_id` in the payload of all [subscription events.](../5-references/1-webhook/README.md#subscription)

A typical request could look like this: 

<CodeSwitcher :languages="{js:'JavaScript',php:'Php'}">
<template v-slot:js>

```js
// Replace {subscriptionId} and {subscriptionItemId}
const url = 'https://api.billing.prestashop.com/v1/subscriptions/{subscriptionId}/items/{subscriptionItemId}/quantity';
const options = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: ''
  },
  body: '{"quantity":10}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

</template>
<template v-slot:php>

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://api.billing.prestashop.com/v1/subscriptions/subscriptionId/items/subscriptionItemId/quantity', [
  'body' => '{
  "quantity": 10
}',
  'headers' => [
    'Accept' => 'application/json',
    'Authorization' => '',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

</template>
</CodeSwitcher>


:::tip
You are not limited to using JavaScript of course. You can see a large selection of code snippets for this very same request [right here](https://prestashop-billing.stoplight.io/docs/api-gateway/533ffe47d3f3a-set-the-quantity-of-a-subscription-item) in the "Request Sample" box in the right column.
:::
Upon receiving a `200` response containing a body of the following snippet, the subscription will be updated, and the next invoice will reflect this new information.
```json
{
  "item": {
    "quantity": 10
  }
}
```

For more information, as well as mockups servers, sample responses & request data, you can directly head to our API Reference which explores in great detail how to use the endpoint [here](https://prestashop-billing.stoplight.io/docs/api-gateway/533ffe47d3f3a-set-the-quantity-of-a-subscription-item) 
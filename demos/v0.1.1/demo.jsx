export default function () {
  return (
    <>
      <Form model="formModel">
        <FormItem label={$t('T.name')}>
          <Input v-model="formModel.name" />
        </FormItem>
        <FormItem label={$t('T.age')}>
          <Input v-model="formModel.age" />
        </FormItem>
        <FormItem label={$t('T.gender')}>
          <Input v-model="formModel.gender" />
        </FormItem>
      </Form>
    </>
  )
}

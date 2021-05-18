import { ClientProxyProvider } from '@/modules/shared/providers/client-proxy.provider'
import { Controller } from '@nestjs/common'

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}
}
